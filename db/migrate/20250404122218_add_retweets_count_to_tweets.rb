# frozen_string_literal: true

class AddRetweetsCountToTweets < ActiveRecord::Migration[7.0]
  def change
    add_column :tweets, :retweets_count, :integer, null: false, default: 0
  end
end
