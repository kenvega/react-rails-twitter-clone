# frozen_string_literal: true

class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.references :follower, null: false, foreign_key: { to_table: :users }
      t.references :followed, null: false, foreign_key: { to_table: :users }

      # add unique index because user cannot follow the same person twice
      t.index [:follower_id, :followed_id], unique: true

      t.timestamps
    end

    # commented unique index (because line 't.index [...]' already does that )
    #   this is just another way to add a unique index and get exactly the same result
    # you can test if both do the same by commenting one
    #   and run migrations/rollback to check if the db structure is the same
    # this way was the old way to do it in rails
    #   and then the rails framework was updated to add indexes inside the create_table method
    #     so for now we will stick with the new way
    # add_index :follows, [:follower_id, :followed_id], unique: true
  end
end
