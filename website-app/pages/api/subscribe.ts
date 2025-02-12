// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '@/lib/supabase';

type Subscriber = {
  email: string;
  created_at: string;
  status: "subscribed" | "unsubscribed";
};

type SubscribeApiResponse = {
  success?: boolean;
  message: string;
  data?: Subscriber;
  alreadySubscribed?: boolean;
  error?: string;
};

type SubscribeRequestBody = {
  email: string;
};

async function checkSubscriber(email: string): Promise<Subscriber | null> {
  const { data, error } = await supabase
    .from("updates_subscribers")
    .select("email, status, created_at")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }
  
  return data;
}

async function createSubscriber(email: string) {
  const { error } = await supabase
    .from("updates_subscribers")
    .insert([
      {
        email,
        status: "subscribed",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return null;
}

async function updateSubscriberStatus(
  email: string,
  status: "subscribed" | "unsubscribed"
) {
  const { error } = await supabase
    .from("updates_subscribers")
    .update({ status })
    .eq("email", email)
    .select()
    .single();

  if (error) throw error;
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are allowed",
    });
  }

  try {
    const { email } = req.body as SubscribeRequestBody;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: "Invalid email address",
        message: "Please provide a valid email address",
      });
    }

    const existingSubscriber = await checkSubscriber(email);

    if (existingSubscriber) {
      if (existingSubscriber.status === "subscribed") {
        return res.status(200).json({
          message: "You are already subscribed to our updates.",
          alreadySubscribed: true,
          data: existingSubscriber,
        });
      }

      // Reactivate subscription
      const updatedSubscriber = await updateSubscriberStatus(email, "subscribed");
      return res.status(200).json({
        success: true,
        message: "Thank you for subscribing to our updates!",
        data: updatedSubscriber || undefined,
      });
    }

    // Create new subscription
    const newSubscriber = await createSubscriber(email);
    return res.status(200).json({
      success: true,
      message: "Thank you for subscribing to our updates!",
      data: newSubscriber || undefined,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}