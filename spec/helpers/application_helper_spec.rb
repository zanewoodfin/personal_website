require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#bootstrap_class_for" do
    subject { helper.bootstrap_class_for flash_type }

    let(:flash_type) { "success" }

    it { is_expected.to eq("alert-success") }

    context "when flash_type is error" do
      let(:flash_type) { "error" }

      it { is_expected.to eq("alert-danger") }
    end

    context "when flash_type is alert" do
      let(:flash_type) { "alert" }

      it { is_expected.to eq("alert-warning") }
    end

    context "when flash_type is notice" do
      let(:flash_type) { "notice" }

      it { is_expected.to eq("alert-info") }
    end

    context "when flash_type is anything else" do
      let(:flash_type) { "nonsense" }

      it { is_expected.to eq("nonsense") }
    end
  end
end
