import * as prismic from "@prismicio/client";

export const repositoryName = "davidegatsby";

export const createClient = (config?: prismic.ClientConfig) =>
  prismic.createClient(repositoryName, {
    ...config,
  });
