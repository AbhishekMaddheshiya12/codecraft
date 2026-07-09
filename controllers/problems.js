import axios from "axios";
// import problems from "../fakeData/problems.js";
import { Problem } from "../models/problems.js";
import { User } from "../models/user.js";
import { GoogleGenAI } from "@google/genai";

const encodeBase64 = (str) => Buffer.from(str, "utf8").toString("base64");

const decodeBase64 = (str) => Buffer.from(str, "base64").toString("utf8");

const getAllProblem = async (req, res) => {
  try {
    const problems = await Problem.find({});
    // console.log(problems);
    return res.status(200).json(problems);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getSubmissionResult = async (tokens) => {
  try {
    let pendingTokens = [...tokens];
    const results = new Array(tokens.length);

    while (pendingTokens.length > 0) {
      const options = {
        method: "GET",
        url: "https://judge0-extra-ce.p.rapidapi.com/submissions/batch",
        params: {
          tokens: pendingTokens.join(","),
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      const submissions = response.data.submissions || [];

      const nextPending = [];

      submissions.forEach((submission, index) => {
        const originalIndex = tokens.indexOf(pendingTokens[index]);

        if (
          !submission ||
          submission.status.description === "In Queue" ||
          submission.status.description === "Processing"
        ) {
          nextPending.push(pendingTokens[index]);
          return;
        }

        results[originalIndex] = {
          id: originalIndex + 1,
          status: submission.status.description,
          stdout: Buffer.from(submission.stdout || "", "base64").toString(
            "utf8",
          ),
          stderr: Buffer.from(submission.stderr || "", "base64").toString(
            "utf8",
          ),
          compile_output: Buffer.from(
            submission.compile_output || "",
            "base64",
          ).toString("utf8"),
        };
      });

      pendingTokens = nextPending;

      if (pendingTokens.length > 0) {
        await sleep(1000);
      }
    }

    let hasFailure = false;
    let failureStatus = "Accepted";

    for (const result of results) {
      if (result && result.status !== "Accepted") {
        hasFailure = true;
        failureStatus = result.status;
        break;
      }
    }

    return {
      results,
      hasFailure,
      failureStatus,
    };
  } catch (error) {
    console.error(error);

    return {
      results: [],
      hasFailure: true,
      failureStatus: "Judge0 Error",
    };
  }
};

const judgeSubmission = async (req, res) => {
  try {
    const { language_id, base64EncodedCode, problemId } = req.body;

    if (!language_id || !base64EncodedCode || !problemId) {
      return res.status(400).json({
        success: false,
        message: "Not enough data",
      });
    }

    const problemData = await Problem.findOne({
      id: Number(problemId),
    }).select("+driverCode");

    // console.log(problemData);
    // console.log(problemData.toObject());

    if (!problemData) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const languageMap = {
      1: "c",
      2: "cpp",
      3: "java",
      4: "python",
      9: "javascript",
    };

    const language = languageMap[language_id];

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Unsupported language",
      });
    }

    const userCode = decodeBase64(base64EncodedCode);

    // console.log("Language ID:", language_id);
    // console.log("Language:", language);
    // console.log("Driver Code:", problemData.driverCode);
    // console.log(
    //   "Driver Code for language:",
    //   problemData.driverCode?.[language],
    // );
    const finalSourceCode = problemData.driverCode[language].replace(
      "{{USER_CODE}}",
      userCode,
    );

    // Encode again for Judge0
    const finalSourceCodeBase64 = encodeBase64(finalSourceCode);

    const submissions = problemData.testCases.map((testCase) => ({
      language_id,

      source_code: finalSourceCodeBase64,

      stdin: encodeBase64(testCase.input),

      expected_output: encodeBase64(testCase.expectedOutput),

      callback_url: "https://localhost:4000/user/judge0-callback",
    }));

    const options = {
      method: "POST",
      url: "https://judge0-extra-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: true,
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        submissions,
      },
    };

    const response = await axios.request(options);

    if (!response.data) {
      return res.status(400).json({
        success: false,
        message: "Submission failed",
      });
    }

    const tokens = response.data.map((submission) => submission.token);

    const finalResult = await getSubmissionResult(tokens);

    const { results, hasFailure, failureStatus } = finalResult;

    const updatedTestCases = problemData.testCases.map((testCase, index) => ({
      ...testCase.toObject(),

      status: results[index]?.status || "Unknown",

      stdout: results[index]?.stdout || "",
    }));

    return res.status(200).json({
      success: true,
      updatedTestCases,
      results,
      hasFailure,
      failureStatus,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleLikes = async (req, res) => {
  try {
    const userId = req.user;
    const problemId = req.params.problemId;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(400).json({
        success: false,
        message: "Problem Not Found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (problem.likes.includes(userId)) {
      const index = problem.likes.indexOf(userId);
      problem.likes.splice(index, 1);
      await problem.save();
      return res.status(200).json({
        success: true,
        message: "Problem Unliked Successfully",
      });
    }

    problem.likes.push(userId);
    await problem.save();
    return res.status(200).json({
      success: true,
      message: "Problem Liked Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const handleDislikes = async (req, res) => {
  try {
    const userId = req.user;
    const problemId = req.params.problemId;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(400).json({
        success: false,
        message: "Problem Not Found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (problem.dislikes.includes(userId)) {
      const index = problem.dislikes.indexOf(userId);
      problem.dislikes.splice(index, 1);
      await problem.save();
      return res.status(200).json({
        success: true,
        message: "Problem Undisliked Successfully",
      });
    }

    problem.dislikes.push(userId);
    await problem.save();
    return res.status(200).json({
      success: true,
      message: "Problem Disliked Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSpecificProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const problem = await Problem.find({ id: problemId });
    return res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getLikes = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const userId = req.user;

    const problem = await Problem.findOne({ id: problemId });

    if (!problem) {
      return res.status(400).json({
        success: false,
        message: "Problem Not Found",
      });
    }

    const likes = problem.likes?.length || 0;
    const dislikes = problem.dislikes?.length || 0;
    const userLike = problem.likes.includes(userId);
    const userDislike = problem.dislikes.includes(userId);

    return res.status(200).json({
      success: true,
      message: "Likes Fetched Successfully",
      likes,
      dislikes,
      userLike,
      userDislike,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSolved = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const userId = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isSolved = user.problemSolved?.some(
      (id) => id.toString() === problemId,
    );

    return res.status(200).json({
      success: true,
      message: isSolved ? "Problem Solved" : "Problem Not Solved",
      solved: isSolved,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const analysis = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Plz give me the code",
      });
    }
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analyze the time and space complexity of the following code and reply with little explanation withhighlighted complexities in 90 words and not more than 3 lines first line time complexity second line space complexity and third line is explation and all there are in not markdown :\n\n${code}`,
    });

    console.log(response.text);

    return res.status(200).json({
      success: true,
      message: "Analysis done",
      analysis: response.text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  judgeSubmission,
  getAllProblem,
  handleLikes,
  handleDislikes,
  getSpecificProblem,
  getLikes,
  getSolved,
  analysis,
};
