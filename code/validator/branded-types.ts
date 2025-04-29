type Brand<K, T> = K & { __brand: T }
type UserID = Brand<string, 'UserId'>
type PostID = Brand<string, 'PostId'>

const persist = (user: UserID, post: PostID) => {}

const userId = '123' as UserID
const postId = '456' as PostID

persist(userId, postId)



const persist2 = ({ userId, postId }: { userId: string; postId: string }) => {}

persist2({ userId: postId, postId: '42' })
