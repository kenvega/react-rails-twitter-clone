# frozen_string_literal: true

module Api
  module V1
    class ReplyTweetsController < ApplicationController
      before_action :authenticate_user!

      def index
        render json: tweet.reply_tweets
      end

      def create
        @reply_tweet = Tweet.find(params[:tweet][:tweet_id]).reply_tweets.create(tweet_params.merge(user: current_user))

        @reply_tweet.save
      end

      private

      def tweet
        Tweet.find(params[:tweet_id])
      end

      def tweet_params
        params.require(:tweet).permit(:body)
      end
    end
  end
end
