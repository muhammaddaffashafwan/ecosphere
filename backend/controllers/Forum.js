import { Forum, Like, Reply } from "../models/ForumModel.js";

// Assuming you have a middleware to authenticate the user and populate req.user

export const createForum = async (req, res) => {
  const { title, caption, hashtags, image_url } = req.body;
  const user_id = req.user.id; // assuming the user is authenticated and user_id is in req.user
  const uname = req.user.username; // Ensure this is how you're accessing the username

  try {
    // Check if user is authenticated (ensure req.user is populated)
    if (!user_id || !uname) {
      return res.status(400).json({ error: "User authentication failed. Please log in." });
    }

    // Validate the input data
    if (!title || !caption) {
      return res.status(400).json({ error: "Title and caption are required." });
    }

    // Create the forum post
    const forumPost = await Forum.create({
      user_id, 
      uname, 
      title, 
      caption, 
      hashtags, 
      image_url
    });

    // Respond with success message and created forum post
    res.status(201).json({
      message: "Forum post created successfully",
      forumPost
    });
  } catch (error) {
    // Handle errors (for example, validation or database errors)
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



// Get all forum posts
export const getForum = async (req, res) => {
  try {
    const forumPosts = await Forum.findAll({
      include: [
        {
          model: Like,
          attributes: ['id'], // Include the likes count (if needed)
        },
        {
          model: Reply,
          attributes: ['id'], // Include the replies count (if needed)
        },
      ],
      order: [['createdAt', 'DESC']], // Order by latest createdAt
    });

    res.status(200).json(forumPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific forum post by ID
export const getForumById = async (req, res) => {
  const { id } = req.params;

  try {
    const forumPost = await Forum.findOne({
      where: { id },
      include: [
        {
          model: Like,
          attributes: ['id'],
        },
        {
          model: Reply,
          attributes: ['id'],
        },
      ],
    });

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    res.status(200).json(forumPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing forum post
export const updateForum = async (req, res) => {
  const postId = req.params.id;
  const { title, caption, hashtags, image_url } = req.body;
  const user_id = req.user.id;

  try {
    // Find the post by ID and verify the user_id
    const forumPost = await Forum.findOne({ where: { id: postId, user_id } });

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found or not authorized" });
    }

    // Update the fields if provided
    forumPost.title = title || forumPost.title;
    forumPost.caption = caption || forumPost.caption;
    forumPost.hashtags = hashtags || forumPost.hashtags;
    forumPost.image_url = image_url || forumPost.image_url;

    // Save the updated post
    await forumPost.save();

    res.status(200).json({ message: "Forum post updated successfully", forumPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a forum post
export const deleteForum = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const forumPost = await Forum.findOne({ where: { id, user_id } });

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found or not authorized" });
    }

    await forumPost.destroy();
    res.status(200).json({ message: "Forum post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a forum post
export const likeForum = async (req, res) => {
  const { id } = req.params; // forum post id
  const user_id = req.user.id; // authenticated user's id

  try {
    // Check if the forum post exists
    const forumPost = await Forum.findOne({ where: { id } });
    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Check if the user has already liked this post
    const existingLike = await Like.findOne({ where: { forum_id: id, user_id } });

    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    // Create a new like
    const like = await Like.create({ 
      forum_id: id,  // the forum post id
      user_id        // the authenticated user's id
    });

    // Return success message and the created like
    res.status(201).json({ message: "Liked successfully", like });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Unlike a forum post
export const unlikeForum = async (req, res) => {
  const { id } = req.params;  // forum post id
  const user_id = req.user.id; // authenticated user's id

  try {
    // Check if the forum post exists
    const forumPost = await Forum.findOne({ where: { id } });

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Find the like entry
    const like = await Like.findOne({ where: { forum_id: id, user_id } });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    // Destroy (remove) the like
    await like.destroy();
    res.status(200).json({ message: "Unliked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Reply to a forum post
export const replyToForum = async (req, res) => {
  const { id: forum_id } = req.params; // Extract and rename `id` to `forum_id`
  const { reply_text } = req.body;     // Extract `reply_text` from the request body
  const user_id = req.user?.id;        // Extract `user_id` from the authenticated user (optional chaining)
  const uname = req.user?.username;    // Extract `username` from the authenticated user (optional chaining)

  try {
    // Log request details for debugging
    console.log("Request Parameters:", req.params);
    console.log("Request Body:", req.body);

    // Validate `forum_id`
    if (!forum_id) {
      return res.status(400).json({ message: "Forum ID is required" });
    }

    // Validate `user_id`
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Validate `reply_text`
    if (typeof reply_text !== "string" || reply_text.trim().length === 0) {
      return res.status(400).json({ message: "Reply text is required and cannot be empty" });
    }

    // Check if the forum post exists
    const forumPost = await Forum.findOne({ where: { id: forum_id } });
    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Create the reply
    const reply = await Reply.create({
      forum_id,
      user_id,
      reply_text: reply_text.trim(), // Save trimmed reply text
      uname, // Optionally include the username of the replying user
    });

    // Send success response with the reply data
    return res.status(201).json({
      message: "Reply added successfully",
      reply: {
        id: reply.id,
        forum_id: reply.forum_id,
        user_id: reply.user_id,
        reply_text: reply.reply_text,
        username: reply.uname,
        createdAt: reply.createdAt, // Include creation timestamp
        updatedAt: reply.updatedAt, // Include update timestamp
      },
    });
  } catch (error) {
    console.error("Error adding reply:", error.message); // Log error for debugging
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



// Delete a reply
export const deleteReply = async (req, res) => {
  const { id: reply_id } = req.params; // Extract and rename `id` to `reply_id`
  const user_id = req.user.id;         // Extract `user_id` from the authenticated user

  try {
    // Debugging logs
    console.log("req.params:", req.params); // Log the request parameters
    console.log("req.body:", req.body);     // Log the request body
    console.log("reply_id:", reply_id);     // Log the extracted reply ID
    console.log("user_id:", user_id);       // Log the user ID

    // Validate `reply_id`
    if (!reply_id) {
      return res.status(400).json({ message: "Reply ID is required" });
    }

    // Find the reply by `reply_id` and `user_id`
    const reply = await Reply.findOne({ where: { id: reply_id, user_id } });

    // If the reply doesn't exist or the user is not authorized to delete it
    if (!reply) {
      return res.status(404).json({ message: "Reply not found or you are not authorized to delete this reply" });
    }

    // Delete the reply
    await reply.destroy();

    // Return success message
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    // Handle server errors
    console.error("Error deleting reply:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller untuk mendapatkan semua reply untuk sebuah forum berdasarkan forum_id
export const getRepliesByForumId = async (req, res) => {
  const { id: forum_id } = req.params; // Mengambil forum_id dari parameter URL

  try {
    // Menampilkan semua reply yang terkait dengan forum_id tertentu
    const replies = await Reply.findAll({
      where: {
        forum_id: forum_id, // Memastikan hanya reply terkait forum ini yang diambil
      },
      order: [['createdAt', 'ASC']], // Mengurutkan reply berdasarkan waktu pembuatan, dari yang paling lama
    });

    // Jika tidak ada reply ditemukan
    if (replies.length === 0) {
      return res.status(404).json({ message: "No replies found for this forum post." });
    }

    // Menampilkan reply dalam response
    res.status(200).json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error.message); // Log error untuk debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
