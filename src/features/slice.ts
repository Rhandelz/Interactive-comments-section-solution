import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { nanoid } from "nanoid";
import data from "../../data/data.json";

export interface DataType {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  commentId: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: ReplyType[];
}
export interface ReplyType extends Omit<DataType, "replies"> {
  replyingTo: string;
  userReply: string;
}

type ValueType = {
  value: DataType[] | any[];
};

const localData = localStorage.getItem("data");

const initialState: ValueType = {
  value: localData ? JSON.parse(localData) : data.comments,
};

export const counterSlice = createSlice({
  name: "comment",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<DataType>) => {
      state.value.push(action.payload);

      // saveToLocal(initialState.value);

      localStorage.setItem("data", JSON.stringify(state.value));
    },
    replyComment: (
      state,
      action: PayloadAction<{
        commentId: string;
        replyingInto: string;
        content: string;
      }>
    ) => {
      const { commentId, replyingInto, content } = action.payload;

      const foundComment: DataType = state.value.find(
        (data) => data.id === commentId
      );

      foundComment.replies.push({
        id: nanoid(),
        content: content,
        createdAt: new Date().toISOString(),
        score: 0,
        commentId: commentId,
        replyingTo: replyingInto,
        userReply: data.currentUser.id,
        user: {
          image: {
            png: data.currentUser.image.png,
            webp: data.currentUser.image.webp,
          },
          username: data.currentUser.username,
        },
      });

      /*      saveToLocal(state.value); */

      localStorage.setItem("data", JSON.stringify(state.value));
    },

    deleteComment: (state, action: PayloadAction<string>) => {
      const filterComment = state.value.filter(
        (data) => action.payload !== data.id
      );

      state.value = filterComment;

      /*      saveToLocal(state.value); */

      localStorage.setItem("data", JSON.stringify(state.value));
    },

    deleteReply: (
      state,
      action: PayloadAction<{ commentId: string; userId: string }>
    ) => {
      const filterComment = state.value.map((data) => {
        const filters = data.replies.filter((datas: ReplyType) => {
          return datas.id !== action.payload.commentId;
        });

        return {
          ...data,
          replies: filters,
        };
      });

      state.value = filterComment;

      /*      saveToLocal(state.value); */

      localStorage.setItem("data", JSON.stringify(state.value));
    },

    editComment: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const filterComment = state.value.map((data) => {
        if (data.id === action.payload.id) {
          data.content = action.payload.content;
        }

        return {
          ...data,
        };
      });

      state.value = filterComment;

      /*      saveToLocal(state.value); */

      localStorage.setItem("data", JSON.stringify(state.value));
    },

    editReply: (
      state,
      action: PayloadAction<{
        commentId: string;
        userId: string;
        content: string;
      }>
    ) => {
      const filterComment = state.value.map((data: DataType) => {
        const filterReplies = data.replies.map((datas: ReplyType) => {
          if (datas.id === action.payload.userId) {
            return {
              ...datas,
              content: action.payload.content,
            };
          } else {
            return datas;
          }
        });

        return {
          ...data,
          replies: filterReplies,
        };
      });

      state.value = filterComment;

      localStorage.setItem("data", JSON.stringify(state.value));

      /*      saveToLocal(state.value); */
    },

    increament: (
      state,
      action: PayloadAction<{ id: string; replyId: string | null }>
    ) => {
      if (action.payload.replyId) {
        const filterComment = state.value.map((data: DataType) => {
          const filterReplies = data.replies.map((datas: ReplyType) => {
            if (datas.id === action.payload.replyId) {
              return {
                ...datas,
                score: datas.score + 1,
              };
            } else {
              return datas;
            }
          });

          return {
            ...data,
            replies: filterReplies,
          };
        });

        state.value = filterComment;
      } else {
        const filterComment = state.value.map((data: DataType) => {
          if (data.id === action.payload.id) {
            return {
              ...data,
              score: data.score + 1,
            };
          } else {
            return data;
          }
        });

        state.value = filterComment;
      }

      localStorage.setItem("data", JSON.stringify(state.value));
    },

    decreament: (
      state,
      action: PayloadAction<{ id: string; replyId: string | null }>
    ) => {
      if (action.payload.replyId) {
        const filterComment = state.value.map((data: DataType) => {
          const filterReplies = data.replies.map((datas: ReplyType) => {
            if (datas.id === action.payload.replyId) {
              return {
                ...datas,
                score: datas.score - 1,
              };
            } else {
              return datas;
            }
          });

          return {
            ...data,
            replies: filterReplies,
          };
        });

        state.value = filterComment;
      } else {
        const filterComment = state.value.map((data: DataType) => {
          if (data.id === action.payload.id) {
            return {
              ...data,
              score: data.score - 1,
            };
          } else {
            return data;
          }
        });

        state.value = filterComment;
      }

      localStorage.setItem("data", JSON.stringify(state.value));
    },
  },
});

export const {
  addComment,
  replyComment,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
  increament,
  decreament,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
/* export const selectCount = (state: RootState) => state.counter.value; */

export const selectComment = (state: RootState) => state.comment.value;

export default counterSlice.reducer;
