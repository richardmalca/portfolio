import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/svg+xml';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#0a192f',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        fontWeight: 800,
        fontSize: 16,
        color: '#3b82f6',
        letterSpacing: '-0.5px',
      }}
    >
      RM
    </div>,
    { ...size },
  );
}
