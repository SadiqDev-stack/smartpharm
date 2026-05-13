// controllers/assistantController.js
import Assistant from "../services/assistant.js";
import { log } from "../middlewares/logger.js";

export const assistantController = {
  // AI assistant for admin (helps draft responses)
  async getAssistantResponse(req, res, next) {
    try {
      const { message: userPrompt } = req.body;

      if (!userPrompt || typeof userPrompt !== "string") {
        throw new req.AppError("invalid user message!");
      }

      const prompt = `User message: ${userPrompt}\n`;

      Assistant.getResponse(
        req,
        Assistant.aiContexts.assistance(),
        [{ role: "user", content: prompt }],
        (success, response) => {
          if (!success) {
            return res.status(500).json({
              success: false,
              message: "Sorry, I couldn't process that. Please try again."
            });
          }

          res.status(200).json({
            success: true,
            message: response
          });
        }
      );
    } catch (error) {
      log(error);
      req.err = error;
      next();
    }
  },

  // AI chat for user dashboard
  async getUserChat(req, res, next) {
    try {
      const { message, userId, userName } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({
          success: false,
          message: "Message is required"
        });
      }

      const prompt = `
User: ${userName || "Customer"}
Message: ${message}

Please provide a helpful response about Smart Pharm medications, health products, orders, or support.
`;

      Assistant.getResponse(
        req,
        Assistant.aiContexts.userChatContext(),
        [{ role: "user", content: prompt }],
        (success, response) => {
          if (!success) {
            return res.status(500).json({
              success: false,
              message: "Sorry, I'm having trouble. Please try again."
            });
          }

          res.status(200).json({
            success: true,
            message: response
          });
        }
      );
    } catch (error) {
      log(error);
      req.err = error;
      next();
    }
  },
};