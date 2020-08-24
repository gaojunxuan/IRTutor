import React, { useState } from "react";
import { Stack, IStackStyles, IStackItemStyles, Text, IChoiceGroupStyles } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';

import { SpectrumPlot } from "./SpectrumPlot";
import { Card, CardItem } from '@uifabric/react-cards';
import "office-ui-fabric-react/dist/css/fabric.css";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { useMediaQuery } from "react-responsive";
import { SpectraSelector } from "./SpectraSelector";
import { MoleculeViewer } from "./MoleculeViewer";

export const SpectraViewer: React.FunctionComponent = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1023px)' })

  const [ selectedSpectrum, setSelectedSpectrum ] = useState<string>("hexane");
  const [ selectedOverlay, setSelectedOverlay ] = useState<string>("none");

  return (
    <Stack horizontalAlign="space-around" gap={24} style={{ padding: 24, minHeight: "100%", maxWidth: "100%" }}>
      <Stack>
        <Stack style={{ height: 240, boxShadow: Depths.depth4, paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24, overflowY: "auto" }} >
          <Stack>
            <SpectraSelector onChange={(spectrum, overlay)=>{
              setSelectedSpectrum(spectrum);
              setSelectedOverlay(overlay);
            }}/>
          </Stack>
        </Stack>
        <Stack style={{ height: 160, boxShadow: Depths.depth4, paddingRight: 24, marginTop: 24, overflowY: "auto" }} >
          <Stack horizontal>
            <MoleculeViewer file={selectedSpectrum}/>
            <Text variant="medium" style={{ marginLeft: 24, marginTop: 24, marginBlock: 24 }}>
              Examine this spectrum of hexane, then select another molecule to continue. Select a peak in the spectrum to see the corresponding molecular vibration. Drag to zoom in.
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <SpectrumPlot spectrum={selectedSpectrum} overlay={selectedOverlay}/>
    </Stack>
  );
}
