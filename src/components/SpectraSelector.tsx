import React, { useState, useEffect } from "react";
import { Stack, ChoiceGroup, IChoiceGroupStyles, IChoiceGroupOption, IChoiceGroupOptionStyles } from "office-ui-fabric-react";
import SpectraOptions from "./spectra.json";

const choiceGroupStyle: IChoiceGroupStyles = {
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  }
}

const choiceStyle: IChoiceGroupOptionStyles = {
  choiceFieldWrapper: {
    marginRight: 24
  }
}

/** Type definition for spectra options stored in spectra.json */
interface ISpectraOption {
  key: string,
  text: string
}

interface ISpectraSelectorProps {
  onChange: (spectrum: string, overlay: string) => void
}

export const SpectraSelector: React.FunctionComponent<ISpectraSelectorProps> = (props) => {
  const [ selectedSpectrum, setSelectedSpectrum ] = useState<string>("hexane")
  const [ selectedOverlay, setSelectedOverlay ] = useState<string>("none")

  useEffect(()=>{ props.onChange(selectedSpectrum, selectedOverlay) }, [selectedSpectrum, selectedOverlay])

  // For creating the gaps between choices. columnGap style is not supported by WebKit.
  const spectraWithStyles = SpectraOptions.spectra.map((x)=>{ return { key: x.key, text: x.text, styles: choiceStyle }})
  let overlayWithStyles: IChoiceGroupOption[] = []
  let overlayData: ISpectraOption[] = Object(SpectraOptions.overlay)[selectedSpectrum];
  if (overlayData != null)
    overlayWithStyles = overlayData.map((x: ISpectraOption)=>{ return { key: x.key, text: x.text, styles: choiceStyle }})

  return (
    <Stack>
      <ChoiceGroup 
        styles={choiceGroupStyle} 
        options={spectraWithStyles} 
        label="Select a molecule to view the spectrum"
        onChange={(e, option) => {
          if(option != null) {
            setSelectedSpectrum(option.key);
            setSelectedOverlay("none");
          }
        }}
        selectedKey={selectedSpectrum}
      />
      <ChoiceGroup 
        styles={choiceGroupStyle} 
        options={overlayWithStyles} 
        label="Select a molecule to overlay" 
        style={{ marginTop: 24 }}
        onChange={(e, option) => {
          if(option != null)
            setSelectedOverlay(option.key);
        }}
        selectedKey={selectedOverlay}
      />
    </Stack>
  )
}
