// Chai is an assertion library and expect is style which comes with chai
import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

//Below is sample assertion test using chai
describe('First test Function',() => {
  it('should pass', () =>{
      expect(true).to.equal(true);
  });
});

//Below is sample test using JSDOM
describe('index.html',() => {
  it('should have h1 for users', () =>{
      const index = fs.readFileSync('./src/index.html',"utf-8");
      jsdom.env(index,(err, window) => {
        const h1 = window.document.getElementsByTagName('h1')[0];
        expect(h1.innerHTML).to.equal("Users");
        window.close();
      });
  });
});
