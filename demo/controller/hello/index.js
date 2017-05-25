module.exports = class {
  async hello() {
    this.render('index');
  }
  body() {
    console.log(this.params);
    console.log(this.request.body);
  }
  foo() {
    console.log(this.redirect);
    // this.json({
      // asd:asdasd
    // })
    // console.log(this.app)
  }
};

