/**
 * For a detailed explanation regarding each configuration property, visit:
 * https:
 */

import type {Config} from 'jest';

const config: Config = {
  //learn
  preset: "ts-jest",
  moduleDirectories: ["node_modules","src"],
  verbose:true,
  coveragePathIgnorePatterns:["/node_modules"],
  clearMocks: true,
  collectCoverage: true,  
  coverageDirectory: "coverage",
  coverageProvider: "v8", 
};

export default config;
