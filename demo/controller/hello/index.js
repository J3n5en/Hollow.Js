module.exports = class {
  async hello() {
    let foo = await this.orm.Foo.findOne();
    console.log(foo.get('name'))
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

