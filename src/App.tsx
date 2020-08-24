import React from 'react';
import { Stack, Text, Link, FontWeights, DocumentCardImage, DocumentCardTitle, DocumentCardDetails, DocumentCard, StackItem } from 'office-ui-fabric-react';
import logo from './fabric.png';

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
          marginLeft: 48,
          marginRight: 48,
          minHeight: '100%',
          height: 'auto',
          paddingTop: 48,
          paddingBottom: 48
        }
      }}
      gap={15}
    >
      <img src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        IR Tutor
      </Text>
      <Text variant="large">Infrared spectroscopy tutorial and reference</Text>

      <Stack wrap horizontal gap={15} horizontalAlign="center" style={{ marginTop: 48 }}>
        <StackItem>
          <DocumentCard onClickHref="http://terra-incognita.dev">
            <DocumentCardImage imageSrc="https://placehold.it/206x100" />
            <DocumentCardDetails>
              <DocumentCardTitle title="Introduction" />
            </DocumentCardDetails>
          </DocumentCard>
        </StackItem>
        <StackItem>
          <DocumentCard onClickHref="http://terra-incognita.dev">
            <DocumentCardImage imageSrc="https://placehold.it/206x100" />
            <DocumentCardDetails>
              <DocumentCardTitle title="Theory" />
            </DocumentCardDetails>
          </DocumentCard>
        </StackItem>
        <StackItem>
          <DocumentCard onClickHref="http://terra-incognita.dev">
            <DocumentCardImage imageSrc="https://placehold.it/206x100" />
            <DocumentCardDetails>
              <DocumentCardTitle title="Interpretation" />
            </DocumentCardDetails>
          </DocumentCard>
        </StackItem>
      </Stack>
    </Stack>
  );
};
