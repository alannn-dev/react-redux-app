import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add post
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      // `Prepare` allows to modify the `payload` (Transform the arguments passed into an action)
      prepare(title, content) {
        return {
          // `Prepare` function return a payload :
          payload: {
            id: nanoid(),
            title,
            content,
          },
        }
      },
    },
    // Update post
    postUpdated(state, action) {
      //{type: 'posts/postUpdated', payload: {id, title, content}}.
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer
