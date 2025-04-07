# frozen_string_literal: true

module Api
  module V1
    class RetweetsController < ApplicationController
      before_action :authenticate_user!

      # POST /tweets/:tweet_id/retweet
      def create
        # Creates the retweet if it doesn't already exist
        current_user.retweets.find_or_create_by(tweet_id: params[:tweet_id])
        render json: { retweeted: true }
      end

      # DELETE /tweets/:tweet_id/retweet
      def destroy
        retweet = current_user.retweets.find_by(tweet_id: params[:tweet_id])
        retweet&.destroy

        render json: { retweeted: false }
      end
    end
  end
end
