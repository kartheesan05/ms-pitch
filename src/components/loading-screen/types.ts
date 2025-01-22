export type SubStep = {
  title: string;
  duration: number;
  progress?: number;
};

export type LoadingStep = {
  icon: string;
  title: string;
  description: string;
  subSteps?: SubStep[];
};

export type StepProps = {
  onComplete: () => void;
  step: LoadingStep;
};
