import { useState } from "react";
import {
  checkIfUpvotedComment,
  upvoteComment
} from "../utils/dbFunctions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

function Comment({ comment, profile }) {
  const [votes, setVotes] = useState(comment.helpful);
  const [loading, setLoading] = useState(false);

  async function handleUpvoteComment() {
    if (!loading) {
      setLoading(true);
      let valid = await validate(comment.id);
      if (valid) {
        await upvoteComment(profile.name, comment.id);
        setVotes(votes + 1);
        setLoading(false);
      }
    }
  }

  async function validate() {
    if (!profile || profile.name === comment.submitter_name) {
      return false;
    }
    let alreadyVoted = await checkIfUpvotedComment(profile.name, comment.id);
    return !alreadyVoted;
  }

  return (
    <Box key={comment.id} sx={{ borderBottom: 1 }}>
      <Typography my="1em">{comment.submitter_name}</Typography>
      <Typography>{comment.comment}</Typography>
      <Stack
        direction="row"
        sx={{ my: "1em", display: "flex", justifyContent: "spaceBetween" }}
      >
        <ThumbUpOutlinedIcon
          sx={{ verticalAlign: "bottom", "&:hover": { color: "primary.main" } }}
          onClick={handleUpvoteComment}
        />
        {votes !== 0 && <Typography ml=".5em">{votes}</Typography>}
      </Stack>
    </Box>
  );
}

export default function Comments({
  version,
  song,
  date,
  location,
  comments,
  user,
  profile
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        sx={{ borderRadius: "50px", textTransform: "none", my: ".5em" }}
      >
        Comments
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {song} - {location} - {date} Comments
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: "120px", mx: "0.25em", my: "1em" }}>
            {comments &&
              comments.map(
                (comment) =>
                  comment.comment && (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      profile={profile}
                    />
                  )
              )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
