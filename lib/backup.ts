export type LocalBackupPayload = {
  format: 'long-chinese-backup';
  version: 1;
  exportedAt: string;
  profile: Record<string, unknown>;
  learning: Record<string, unknown>;
  voice: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function createLocalBackup(input: {
  profile: Record<string, unknown>;
  learning: Record<string, unknown>;
  voice: Record<string, unknown>;
}, now = new Date()): string {
  return JSON.stringify({
    format: 'long-chinese-backup',
    version: 1,
    exportedAt: now.toISOString(),
    ...input,
  } satisfies LocalBackupPayload, null, 2);
}

export function parseLocalBackup(text: string): LocalBackupPayload {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  if (!isRecord(value) || value.format !== 'long-chinese-backup' || value.version !== 1) {
    throw new Error('This is not a supported Lóng backup file.');
  }
  if (!isRecord(value.profile) || typeof value.profile.name !== 'string') {
    throw new Error('The learner profile is missing or damaged.');
  }
  if (!isRecord(value.learning) || typeof value.learning.xp !== 'number' || !Array.isArray(value.learning.favorites) || !Array.isArray(value.learning.personalWords)) {
    throw new Error('The learning progress is missing or damaged.');
  }
  if (!isRecord(value.voice) || !['zh-CN', 'zh-TW', 'zh-HK'].includes(String(value.voice.accent))) {
    throw new Error('The voice preferences are missing or damaged.');
  }
  return value as LocalBackupPayload;
}
