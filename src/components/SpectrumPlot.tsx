import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import SpectrumData from './data.json';
import SpectraNames from './names.json';
import { Stack, Text } from 'office-ui-fabric-react';
import SpectraParser from './SpectraParser';
import { PlotData, deleteTraces } from 'plotly.js';
import SpectrumHighlightRange from "./highlightRange.json";
import { findClosest } from './utils/FindClosest';

interface ISpectrumPlotProps {
  spectrum: string,
  overlay?: string
}

interface ISpectrumHighlightRange {
  key: string,
  leftBound: number,
  rightBound: number,
  isLeftInclusive: boolean,
  isRightInclusive: boolean
}

export const SpectrumPlot: React.FunctionComponent<ISpectrumPlotProps> = (props: ISpectrumPlotProps) => {
  const [ overlayData, setOverlayData ] = useState<Array<Partial<PlotData>>>([]);
  const [ highlightData, setHighlightData ] = useState<Array<Partial<PlotData>>>([]);

  useEffect(()=>{
    let newOverlayData: Partial<PlotData>[] = [];
    if (props.overlay && props.overlay != "none") {
      newOverlayData.push({
        x: Object(SpectrumData)[props.overlay].x,
        y: Object(SpectrumData)[props.overlay].y,
        type: 'scatter',
        line: {
          width: 1.5,
          color: "orange"
        },
        hoverinfo: "none",
      });
    }
    setOverlayData(newOverlayData);
  }, [props.overlay]);

  useEffect(()=>{
    setHighlightData([]);
  }, [props.spectrum]);

  // TODO: render highlight region without affecting zoom
  let renderHighlightRange = function(x: number, spectrum: string) {
    // Load json file
    let highlightRangeReference = SpectrumHighlightRange.general;
    let specificRange = Object(SpectrumHighlightRange)[spectrum];
    // Append molecule-specific data
    if (specificRange != null)
      highlightRangeReference = highlightRangeReference.concat(specificRange);

    let matched = false;
    let matchedRange: ISpectrumHighlightRange | null = null;
    highlightRangeReference.forEach(i => {
      if (i.isLeftInclusive) {
        if (i.isRightInclusive) {
          if (x >= i.leftBound && x <= i.rightBound) {
            matched = true;
            matchedRange = i;
          }
        }
        else {
          if (x >= i.leftBound && x < i.rightBound) {
            matched = true;
            matchedRange = i;
          }
        }
      }
      else {
        if (i.isRightInclusive) {
          if (x > i.leftBound && x <= i.rightBound) {
            matched = true;
            matchedRange = i;
          }
        }
        else {
          if (x > i.leftBound && x < i.rightBound) {
            matched = true;
            matchedRange = i;
          }
        }
      }
    });
    if (matched) {
      if (matchedRange != null) {
        const leftIndex: number = findClosest(matchedRange!.leftBound, Object(SpectrumData)[spectrum].x as []);
        const rightIndex: number = findClosest(matchedRange!.rightBound, Object(SpectrumData)[spectrum].x as []);
        let xData = (Object(SpectrumData)[spectrum].x as number[]);
        let yData = (Object(SpectrumData)[spectrum].y as number[]);
        setHighlightData([
          {
            x: xData.slice(leftIndex, rightIndex),
            y: yData.slice(leftIndex, rightIndex),
            type: 'scatter',
            line: {
              width: 1.5,
              color: "red"
            },
            hoverinfo: "none",
          },
          {
            x: [xData[leftIndex], xData[rightIndex]],
            y: [1, 1],
            type: 'scatter',
            line: {
              width: 1.5,
              color: "red"
            },
            fill: "tonexty",
            hoverinfo: "none",
          }
        ]);
      }
    }
    else {
      setHighlightData([]);
    }
  };

  // TODO: make it more robust, no crash even if spectrum data is not found
  return (
    <Plot
      data={[
        {
          x: Object(SpectrumData)[props.spectrum].x,
          y: Object(SpectrumData)[props.spectrum].y,
          type: 'scatter',
          line: {
            width: 1.5,
            color: "#2c78cd"
          },
          hoverinfo: "none",
        },
        ...overlayData,
        ...highlightData
      ]}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
      layout={ { 
        autosize: true, 
        showlegend: false, 
        title: Object(SpectraNames)[props.spectrum], 
        margin: { l: 0, r: 0 }, 
        xaxis: { autorange: "reversed" }, 
        yaxis: { fixedrange: true, range: [-0.1, 1.1] },
        titlefont: { family: "\"Segoe UI\", \"Segoe UI Web (West European)\", \"Segoe UI\"" } 
      } }
      onClick={(e)=>{
        let points = e.points
        if (points != null && points.length > 0) {
          renderHighlightRange(points[0].x as number, props.spectrum);
        }
      }}
    />
  );
}
