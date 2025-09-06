import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`https://judysphere.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0" sx={{ transition: "all 0.3s", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.1)" } }}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      
      <Typography color={main} sx={{ mt: "1rem", fontSize: "1rem", lineHeight: 1.6 }}>
        {description}
      </Typography>

      {picturePath && (
        <Box
          sx={{
            mt: "0.75rem",
            width: "100%",
            maxHeight: "400px",
            overflow: "hidden",
            borderRadius: "0.75rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            cursor: "pointer",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)"
              }
            }
          }}
        >
          <img
            alt="post"
            src={`https://judysphere.onrender.com/assets/${picturePath}`}
          />
        </Box>
      )}

      <FlexBetween mt="0.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography sx={{ fontSize: "0.9rem", color: main }}>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography sx={{ fontSize: "0.9rem", color: main }}>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
