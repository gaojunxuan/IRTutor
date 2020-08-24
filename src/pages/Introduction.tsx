import React from "react";
import { Stack, Text, Link, FontWeights, DocumentCardImage, DocumentCardTitle, DocumentCardDetails, DocumentCard, StackItem, ThemeSettingName, PrimaryButton, Button } from 'office-ui-fabric-react';
const Latex = require('react-latex');
import TeX from '@matejmazur/react-katex';

interface IIntroductionProps {

}

interface IIntroductionState {
  title: string,
  text: Array<React.ReactNode>,
  currentIndex: number
}

export default class Introduction extends React.Component<IIntroductionProps, IIntroductionState> {
  constructor(props: IIntroductionProps) {
    super(props)
    this.state = {
      title: "Introduction",
      text: [
        (<React.Fragment>The story of infrared spectroscopy begins with <Link>Sir Isaac Newton</Link> (1642-1727). He set up an experiement in which a beam of sunlight passed through window shutters into a dark room.</React.Fragment>),
        "Visible and infrared light constitute just a small part of the electromagnetic spectrum, which is the continuous range of light energy.",
        "This is called the electromagnetic spectrum because light can be described as a combination of oscillating electric and magnetic fields, as shown below. This diagram shows plane of polarized light, so called because the electric field always lies in one plane.",
        (<React.Fragment>The oscillating electric field can be described by its wavelength <TeX math="\lambda"></TeX>, the length of one cycle of oscillation, or by its frequency <TeX math="\nu"></TeX>), the number of cycles that pass a point in one second. These are related to by the formula <TeX math="\lambda=c/\nu"></TeX>, where <TeX>c</TeX> is the speed of light (<TeX math="c=3.0\times10^{10}\mathrm{cm/sec}"></TeX>).</React.Fragment>),
        (<React.Fragment>The wavelength of a beam of light defines its position in the electromagnetic spectrum. It is often more convenient to use the <strong>wavenumber <TeX math="\bar{\nu}"/></strong>, defined as the inverse of the wavelength. The <strong>energy</strong> of the light is related to its wavelength by the formula <TeX block math="E=\frac{hc}{\lambda}=hc\bar{\nu}"/> where <TeX math="h"/> is the Planck's constant (<TeX math="h=6.62\times10^{-32}\mathrm{J\cdot s}"/>)</React.Fragment>),
        
      ],
      currentIndex: 0
    }
  }
  render() {
    return (
      <Stack>
        <Stack style={{
          marginLeft: 48,
          marginRight: 48,
          marginTop: 64
        }}>
          <Text variant="xLarge">
            Introduction
          </Text>
          <Text variant="mediumPlus" style={{
            marginTop: 24,
          }}>
            {this.state.text[this.state.currentIndex]}
          </Text>
          <Stack horizontal style={{ marginTop: 48 }}>
            <PrimaryButton text="Continue" onClick={()=>{
              this.setState((state, props) => ({ currentIndex: state.currentIndex + 1 }));
            }}></PrimaryButton>
          </Stack>
        </Stack>
      </Stack>
    )
  }
}