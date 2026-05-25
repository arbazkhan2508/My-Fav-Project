// Central configuration for the birthday surprise experience.
// Modify these details to customize the text, images, letters, and voice notes.

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  video?: string;
  type: 'chat' | 'memory' | 'date' | 'joke' | 'support';
  chatMessages?: { sender: 'me' | 'her'; text: string }[];
}

export interface LoveReason {
  id: number;
  title: string;
  shortDesc: string;
  fullReason: string;
  icon: string; // Emoji
}

export interface PolaroidMemory {
  id: number;
  src: string;
  caption: string;
  rotation: number; // degrees for organic scrapbook feel
}

export interface OpenWhenLetter {
  id: string;
  trigger: string; // e.g. "You miss me"
  title: string;
  letter: string;
  audioUrl?: string; // Voice note path
  image?: string; // Optional handwritten image or chat screenshot
  mediaType?: 'chat' | 'image' | 'video';
  mediaSrc?: string;
}

export const birthdayConfig = {
  // Girlfriend's Details
  girlfriendName: "Bhalu 🐻",
  birthdayDate: "2026-05-28T00:00:00+05:30", // Midnight 28th May (Local Time)
  
  // Audio Config
  bgMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Restored working background audio URL
  
  // Hero Section
  heroPhoto: "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM.jpeg", // Her primary photo on the homepage!
  heroHeading: "Out of all timelines in this universe...",
  heroSubheading: "I'm grateful mine found you.",
  heroTypewriterLines: [
    "Entering your 24th beautiful chapter... 👑",
    "24 years of spreading pure magic... ✨",
    "To my favorite notification...",
    "This is a digital love letter, just for you."
  ],

  // Story Timeline
  timeline: [
    {
      id: "first-chat",
      title: "Where it all began 💬",
      date: "The First Hello",
      description: "It started with a simple 'hey' that turned into endless nights of text. Who knew a single message would change my life forever?",
      type: "chat",
      chatMessages: [
        { sender: 'me', text: 'Hey there! Hope you are having a nice day. 😊' },
        { sender: 'her', text: 'Hey! Haha yes, it is. How about yours? 🙈' },
        { sender: 'me', text: 'Better now that I\'m talking to you. 😉' },
        { sender: 'her', text: 'Oh, smooth! 😂 text me more!' }
      ]
    },
    {
      id: "first-laugh",
      title: "First time laughing together 😂",
      date: "Inside Jokes & Giggles",
      description: "That moment when we realized our humor was perfectly out-of-sync yet completely matched. Your laugh became my favorite sound in the world.",
      image: "/images/bday/WhatsApp Image 2026-05-25 at 9.33.30 AM.jpeg", // real bday image
      type: "joke"
    },
    {
      id: "cute-fight",
      title: "The Pizza Debate 🍕",
      date: "Our Playful Arguments",
      description: "Arguing over who loves whom more (spoiler: it's definitely me) or who gets the last slice. Your angry face is still the cutest thing ever.",
      image: "/images/bday/WhatsApp Image 2026-05-25 at 10.13.20 AM.jpeg", // real bday image
      type: "joke"
    },
    {
      id: "her-magic",
      title: "The Magic of Bhalu 🐻",
      date: "Who You Are To Me",
      description: "It's not just about our journey together—it is about how incredible you are. Your focus, your kind heart, your cute habits, and the way you light up every room you enter. 24 years of your pure, beautiful existence has made this world a hundred times brighter.",
      image: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (4).jpeg",
      type: "support"
    },
    {
      id: "emotional-support",
      title: "My Safe Place 🫂",
      date: "Through Thick and Thin",
      description: "Thank you for being my rock. Whenever the world gets too noisy, holding your hand is the only thing that makes sense.",
      image: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (5).jpeg", // real bday image
      type: "support"
    },
    {
      id: "favorite-memories",
      title: "Infinite Frames of You 🎥",
      date: "Our Favorite Vibe",
      description: "Every single moment, from the quiet silence to the loudest laughs. I'm saving every second in my heart.",
      video: "/images/us/us29.mp4",
      type: "memory"
    }
  ] as TimelineEvent[],

  // Reasons Why I Love You
  reasons: [
    {
      id: 1,
      title: "Your Kindness",
      shortDesc: "How you care for everyone around you.",
      fullReason: "You have this beautiful, pure soul that sees the good in everyone. The way you check up on the people you love and care about the smallest things inspires me to be a better person.",
      icon: "🌸"
    },
    {
      id: 2,
      title: "Your Laugh",
      shortDesc: "The prettiest melody in the world.",
      fullReason: "It doesn't matter how stressed or down I am—the second I hear your laugh, my day lights up. It's a sweet, genuine sound that melts all my worries.",
      icon: "✨"
    },
    {
      id: 3,
      title: "Your Cute Pouts",
      shortDesc: "When you get fake mad or tease me.",
      fullReason: "Whenever you cross your arms and give me that tiny angry pout, I can't help but smile. You look so incredibly adorable, and it makes me want to hug you right then and there.",
      icon: "🥺"
    },
    {
      id: 4,
      title: "Your Strength",
      shortDesc: "How you stand tall and guide me.",
      fullReason: "You are so strong, resilient, and focused. Seeing you push through difficulties, study/work hard, and support me in my goals makes me feel incredibly proud to be yours.",
      icon: "👑"
    },
    {
      id: 5,
      title: "Your Hugs",
      shortDesc: "The place where my heart finds peace.",
      fullReason: "Your hugs feel like home. When you wrap your arms around me, all the noise in the universe fades out. It's just you, me, and total peace.",
      icon: "🫂"
    },
    {
      id: 6,
      title: "Your Uniqueness",
      shortDesc: "You are my once-in-a-lifetime girl.",
      fullReason: "There's nobody like you in the entire universe. You have this perfect blend of beauty, goofiness, intelligence, and grace. I am the luckiest guy alive.",
      icon: "💖"
    }
  ] as LoveReason[],

  // Polaroid Gallery
  polaroids: [
    { id: 1, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM.jpeg", caption: "Looking absolutely gorgeous ✨", rotation: -5 },
    { id: 2, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (1).jpeg", caption: "That beautiful smile of yours 💖", rotation: 4 },
    { id: 3, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (2).jpeg", caption: "Every moment with you is magic 💫", rotation: -3 },
    { id: 4, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (3).jpeg", caption: "My favorite picture of us 🤳", rotation: 6 },
    { id: 5, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (4).jpeg", caption: "Cute, goofy and forever mine 🤪", rotation: -4 },
    { id: 6, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (6).jpeg", caption: "You light up my entire world 🌟", rotation: 5 },
    { id: 7, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (7).jpeg", caption: "Holding onto you forever 🫂", rotation: -6 },
    { id: 8, src: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (8).jpeg", caption: "My once-in-a-lifetime kind of girl 🌸", rotation: 3 },
    { id: 9, src: "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM (1).jpeg", caption: "To infinite more memories together 🥂", rotation: -2 },
  ] as PolaroidMemory[],

  // Open When... Letters
  letters: [
    {
      id: "miss-me",
      trigger: "You miss me",
      title: "Open When You Miss Me 📞",
      letter: "Hey beautiful. If you are reading this, it means you're missing me. I want you to close your eyes, take a deep breath, and remember that I am always, always right there with you in spirit. Distance or time doesn't change the fact that my heart beats only for you. I am probably looking at my phone right now thinking of you too! Here is a cute voice note and a screenshot of the night we talked until 4 AM. I love you so much.",
      mediaType: "chat",
      mediaSrc: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (3).jpeg" // real bday image
    },
    {
      id: "sad",
      trigger: "You are sad",
      title: "Open When You Are Sad 🥺",
      letter: "My love, it breaks my heart to know you're feeling down. I wish I was there to wrap my arms around you and squeeze you tight until you smile. Remember that it's okay to feel sad, but also remember how incredibly strong, loved, and special you are. You have gotten through 100% of your hardest days. Here is a goofy memory to make you smile. I am sending you a million virtual kisses! 😘❤️",
      mediaType: "image",
      mediaSrc: "https://media.tenor.com/efbi1EpFlWUAAAAi/cat-flower.gif" // Fallback funny/cute gif
    },
    {
      id: "motivation",
      trigger: "You need motivation",
      title: "Open When You Need Motivation 🎯",
      letter: "Hey champ! Time to lock in. You are one of the smartest, most dedicated, and talented people I know. Whatever goal or exam or challenge you are facing right now, you are going to absolutely crush it. Don't doubt yourself for a single second. I believe in you, and I am your biggest cheerleader. Take a sip of water, shake off the stress, and show the world what you can do! Go get 'em! 💪✨",
      mediaType: "image",
      mediaSrc: "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM (1).jpeg"
    },
    {
      id: "smile",
      trigger: "You want to smile",
      title: "Open When You Want to Smile 😊",
      letter: "Need a quick serotonin boost? Here is a list of small things that make you so cute: 1) The way you squint your eyes when you laugh really hard. 2) The little happy dance you do when food arrives. 3) How you talk to animals. 4) The way you always say 'just one more minute' when we have to leave. You are an absolute bundle of joy, Bhalu 🐻. Never forget the light you bring into my life!",
      mediaType: "image",
      mediaSrc: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (1).jpeg"
    },
    {
      id: "forgot-special",
      trigger: "You forget how special you are",
      title: "Open When You Forget Your Worth 👑",
      letter: "Sometimes we get caught up in our flaws and forget our own magic. Let me remind you: you are the most beautiful girl in the world, not just on the outside, but your heart is gold. You make my life a hundred times better just by existing. You are smart, funny, drop-dead gorgeous, and incredibly kind. Don't let anyone (especially not your own negative thoughts) make you think otherwise. You are my queen. 👑❤️",
      mediaType: "image",
      mediaSrc: "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM.jpeg"
    }
  ] as OpenWhenLetter[],

  // Final Birthday Message (Editable Paragraph)
  finalSurpriseMessage: `Happy Birthday, my absolute favorite person in the universe! 💖

Today is all about celebrating your 24th birthday—the most beautiful, loving, and magical girl who came into my life and made it complete. I am so incredibly grateful for every single laugh, every late-night conversation, and every dream we\'ve shared. 

You deserve the world and so much more. I promise to be by your side, holding your hand, and loving you more and more with each passing day. Thank you for being my peace, my partner, and my love.

May this new year bring you infinite smiles, success, and all the happiness in the world. 

Forever and always, yours. ❤️`,

  // Interactive Scratchcard Surprise Gift
  scratchcardGiftTitle: "A Romantic Spa & Pamper Day 🧖‍♀️✨",
  scratchcardGiftDesc: "Redeemable anytime you want to feel relaxed, pampered, and completely spoiled. You deserve it, my queen! 👑💖",
  scratchcardGiftPhoto: "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (7).jpeg",

  // Redeemable Love Coupons
  coupons: [
    {
      id: 1,
      title: "Silent Win Card 🏆",
      description: "Redeem to instantly win any silly argument. Use wisely, my love—you only get one! 😉",
      icon: "🤫",
      whatsappMessage: "Hey! I just redeemed my 'Silent Win Card' 🏆! You officially lose the argument, deal done! 🤝😜"
    },
    {
      id: 2,
      title: "Midnight Cravings 🍦",
      description: "Redeem this for a late-night ice cream run or dessert delivery, sponsored entirely by me.",
      icon: "🍨",
      whatsappMessage: "Hey! I'm hungry! I just redeemed my 'Midnight Cravings' voucher 🍦. Get ready to order or take me out! 🐻💖"
    },
    {
      id: 3,
      title: "Infinite Hugs 🫂",
      description: "Redeem for a 20-minute tight squeeze and warm cuddles whenever you feel stressed or cold.",
      icon: "🧸",
      whatsappMessage: "Hey! I need some warmth. I just redeemed my 'Infinite Hugs' coupon 🫂. Prepare for a long hug! ❤️"
    },
    {
      id: 4,
      title: "Massage Session 🧖‍♀️",
      description: "Redeem for a relaxing head and back massage after a long, tiring day.",
      icon: "💆‍♀️",
      whatsappMessage: "Hey! I'm tired. I just redeemed my 'Massage Session' coupon 🧖‍♀️. Your hands are mine tonight! 💆‍♀️✨"
    }
  ],

  // Climax Clues: Video Message and Scanned Handwritten Note
  finalVideoUrl: "/video/birthday_message.mp4", // Put your video file at public/video/birthday_message.mp4
  finalHandwrittenNote: "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM (1).jpeg" // Put your handwritten note image here
};
