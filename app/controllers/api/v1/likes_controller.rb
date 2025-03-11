class Api::V1::LikesController < ApplicationController
  before_action :authenticate_user!

  # POST /tweets/:tweet_id/like
  def create
    # Creates the like if it doesn't already exist
    current_user.likes.find_or_create_by(tweet_id: params[:tweet_id])
    render json: { liked: true }
  end

  # DELETE /tweets/:tweet_id/like
  def destroy
    like = current_user.likes.find_by(tweet_id: params[:tweet_id])
    like&.destroy

    render json: { liked: false }
  end
end 