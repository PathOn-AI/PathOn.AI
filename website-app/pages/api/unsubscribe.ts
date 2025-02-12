import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '@/lib/supabase';

type UnsubscribeApiResponse = {
  success?: boolean;
  message: string;
  error?: string;
};

type UnsubscribeRequestBody = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnsubscribeApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are allowed",
    });
  }

  try {
    const { email } = req.body as UnsubscribeRequestBody;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: "Invalid email address",
        message: "Please provide a valid email address",
      });
    }

    const { error } = await supabase
      .from("updates_subscribers")
      .update({ status: "unsubscribed" })
      .eq("email", email);

    if (error) {
      throw error;
    }

    // Check if any rows were actually updated
    const { count } = await supabase
      .from("updates_subscribers")
      .select("*", { count: "exact" })
      .eq("email", email)
      .eq("status", "unsubscribed")
      .single();

    if (!count) {
      return res.status(404).json({
        error: "Not found",
        message: "This email is not subscribed to our updates.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "You have been successfully unsubscribed from updates.",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}