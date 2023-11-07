const modules = import.meta.glob('@/components/icons/app/*.vue', { eager: true });

export const dashboardIconsMap: Record<string, string> = {};

for (const path in modules) {
  const length: number = path.split('/').length;
  const componentName: string = path.split('/')[length - 1].split('.')[0];
  dashboardIconsMap[`${componentName.split(/(?=[A-Z])/)[0]}`] = path;
}
