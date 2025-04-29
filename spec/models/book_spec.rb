require 'rails_helper'

RSpec.describe Book, type: :model do
  let(:title) { "The Book" }
  let(:author) { "Kilgore Trout" }
  let(:review) { "Good." }
  let(:book) { build :book, title:, author:, review: }

  describe "#valid?" do
    subject { book.valid? }

    it { is_expected.to be(true) }

    context "when title is nil" do
      let(:title) { nil }

      it { is_expected.to be(false) }
    end

    context "when author is nil" do
      let(:author) { nil }

      it { is_expected.to be(false) }
    end

    context "when review is nil" do
      let(:review) { nil }

      it { is_expected.to be(true) }
    end
  end
end
