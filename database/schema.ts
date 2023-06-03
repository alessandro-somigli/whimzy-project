type postRow = {
  post_title: string
  post_text: string
  post_publish_date: string

  post_id: number // pk
  post_user: string // fk -> user.id
}

type contributionRow = {
  cont_text: string
  cont_publish_date: string
  
  cont_post: number // pk fk -> post.id
  cont_user: string // pk fk -> user.id
}

type followRow = {
  follower: string // pk fk -> user.id
  followed: string // pk fk -> user.id
}

export type { postRow, contributionRow, followRow }

type post = postRow & { contributions: Array<contributionRow> } & { username: string, user_image: string };

export type { post }