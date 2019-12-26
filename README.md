# chat-spaceのDB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :posts
- has_many  :groups,  through:  :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
|menber|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :posts
- has_many  :users,  through:  :groups_users

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user