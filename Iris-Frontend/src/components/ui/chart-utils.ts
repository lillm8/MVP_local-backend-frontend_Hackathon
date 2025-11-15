'use client';

import * as React from 'react';
import type { ChartConfig } from './chart';

type ChartContextProps = {
  config: ChartConfig;
};

export const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
}

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === 'object' && value !== null;
}

export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (!isRecord(payload)) {
    return undefined;
  }

  const inner = isRecord((payload as AnyRecord).payload)
    ? ((payload as AnyRecord).payload as AnyRecord)
    : undefined;

  let configLabelKey: string = key;
  if (typeof (payload as AnyRecord)[key] === 'string') {
    configLabelKey = (payload as AnyRecord)[key] as string;
  } else if (inner && typeof inner[key] === 'string') {
    configLabelKey = inner[key] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : (config as AnyRecord)[key as keyof AnyRecord];
}
