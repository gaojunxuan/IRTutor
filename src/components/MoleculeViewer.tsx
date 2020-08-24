import React, { useState, useEffect } from "react";

interface IMoleculeViewerProps {
  file: string
}

declare global {
  interface Window { load: (file: string) => void; }
}

export const MoleculeViewer: React.FunctionComponent<IMoleculeViewerProps> = (props: IMoleculeViewerProps) =>{
  useEffect(() => {
    window.load(props.file);
  }, [props.file]);
  return (
    <div id="jsmolContainer">
    </div>
  );
}