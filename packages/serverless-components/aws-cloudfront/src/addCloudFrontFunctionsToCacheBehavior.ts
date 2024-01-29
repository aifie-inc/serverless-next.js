const validTriggers = ["viewer-request", "viewer-response"];

export type CacheBehavior = {
  FunctionAssociations: {
    Quantity: number;
    Items: {
      EventType: string;
      FunctionARN: string;
    }[];
  };
};

// adds cloudfront functions to cache behavior passed
export default (cacheBehavior: CacheBehavior, functionsConfig = {}): void => {
  Object.keys(functionsConfig).forEach((eventType) => {
    if (!validTriggers.includes(eventType)) {
      throw new Error(`"${eventType}" is not a valid functions trigger.`);
    }

    cacheBehavior.FunctionAssociations.Quantity =
      cacheBehavior.FunctionAssociations.Quantity + 1;
    cacheBehavior.FunctionAssociations.Items.push({
      EventType: eventType,
      FunctionARN: functionsConfig[eventType]
    });
  });
};
