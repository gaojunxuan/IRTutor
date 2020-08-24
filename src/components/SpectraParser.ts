

export default class SpectraParser {
  async load(filename: string) {
    const spectrumFile = require("./Hexane-Gas-IR.jdx");
    let fileReader = new FileReader();
    console.log(fileReader.readAsBinaryString(spectrumFile));
  }
}