type IconName = 'arrow' | 'code' | 'chat' | 'spark' | 'terminal' | 'mail';
const paths: Record<IconName, string> = {
  arrow: 'M7 17 17 7M7 7h10v10',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
  chat: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0ZM7 10h10M7 14h6',
  spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
  terminal: 'm5 7 5 5-5 5m8 0h6M3 3h18v18H3z',
  mail: 'M3 5h18v14H3V5Zm0 0 9 8 9-8',
};
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
