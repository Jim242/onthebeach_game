const expect = require("chai").expect;
const OrderJobs = require("./jobSolutionLogic");

describe("OrderJobs", () => {
  let order = jobs => OrderJobs.create(jobs).execute();

  describe("#execute", () => {
    it("should given passed an empty string expect sequence to be empty", () => {
      expect(order("")).to.eql("");
    });

    it("should given a sequence consisting of a single job expect result sequence to be single job", () => {
      expect(order("a =>")).to.eql("a");
    });

    it("should given a sequence containing all three jobs abc in no significant order result a sequence containing all three jobs", () => {
      let jobs = order("a => \nb => \nc =>");
      expect(jobs).to.have.lengthOf(3);
      expect(jobs).to.contain("a");
      expect(jobs).to.contain("b");
      expect(jobs).to.contain("c");
      console.log(jobs);
    });

    it("should given a sequence positions c before b containing all three jobs abc", () => {
      let jobs = order("a => \nb => c \nc =>");
      expect(jobs).to.have.lengthOf(3);
      expect(jobs).to.contain("a");
      expect(jobs.indexOf("c")).to.below(jobs.indexOf("b"));
      console.log(jobs);
    });

    it("should given a sequence that positions f before c, c before b, b before e and a before d containing all six jobs abcdef", () => {
      let jobs = order("a => \nb => c \nc => f \nd => a \ne => b \nf =>");
      expect(jobs).to.have.lengthOf(6);
      expect(jobs).to.contain("a");
      expect(jobs).to.contain("f");
      expect(jobs.indexOf("f")).to.below(jobs.indexOf("c"));
      expect(jobs.indexOf("c")).to.below(jobs.indexOf("b"));
      expect(jobs.indexOf("b")).to.below(jobs.indexOf("e"));
      expect(jobs.indexOf("a")).to.below(jobs.indexOf("d"));
      console.log(jobs);
    });

    // it("should given a sequence should error stating jobs cant depend on themselves", () => {
    //   let jobs = order("a => \nb => \nc => c");
    //   expect(jobs).fail;
    // });

    // it("should given a sequence should error stating that jobs cant have circular dependencies", () => {
    //   let jobs = order("a => \nb => c \nc => f \nd => a\ne => \nf => b");
    // });
  });
});
