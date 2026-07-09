import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DisLike",
      },
    ],

    description: {
      type: String,
      required: true,
    },

    examples: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
          default: "",
        },
      },
    ],

    constraints: [
      {
        type: String,
      },
    ],

    testCases: [
      {
        id: {
          type: Number,
          required: true,
        },
        input: {
          type: String,
          required: true,
        },
        expectedOutput: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      default: "",
    },
    starterCode: {
      cpp: {
        type: String,
        default: "",
      },
      c: {
        type: String,
        default: "",
      },
      java: {
        type: String,
        default: "",
      },
      javascript: {
        type: String,
        default: "",
      },
      python: {
        type: String,
        default: "",
      },
    },
    driverCode: {
      cpp: {
        type: String,
        default: "",
      },
      c: {
        type: String,
        default: "",
      },
      java: {
        type: String,
        default: "",
      },
      javascript: {
        type: String,
        default: "",
      },
      python: {
        type: String,
        default: "",
      },
    },
    solution: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const Problem =
  mongoose.models.Problem || mongoose.model("Problem", problemSchema);
