import type { CurriculumSection } from './types';
import { DIGITAL_FOUNDATIONS_CATEGORY } from './digital-foundations';
import { PROGRAMMING_FUNDAMENTALS_CATEGORY } from './programming-fundamentals';
import { WEB_DEVELOPMENT_CATEGORY } from './web-development';
import { C_PROGRAMMING_CATEGORY } from './c-programming';
import { DATA_STRUCTURES_CATEGORY } from './data-structures';
import { ALGORITHMS_CATEGORY } from './algorithms';
import { DISCRETE_MATH_CATEGORY } from './discrete-math';
import { ENGINEERING_MATH_CATEGORY } from './engineering-math';
import { DIGITAL_LOGIC_CATEGORY } from './digital-logic';
import { COA_CATEGORY } from './coa';
import { TOC_CATEGORY } from './theory-of-computation';
import { COMPILER_DESIGN_CATEGORY } from './compiler-design';
import { OPERATING_SYSTEMS_CATEGORY } from './operating-systems';
import { DBMS_CATEGORY } from './dbms';
import { COMPUTER_NETWORKS_CATEGORY } from './computer-networks';
import { OOPS_CATEGORY, SYSTEM_DESIGN_CATEGORY, SWE_GIT_CATEGORY } from './software-engineering';
import {
  QUANTITATIVE_APTITUDE_CATEGORY,
  LOGICAL_REASONING_CATEGORY,
  VERBAL_ABILITY_CATEGORY,
  SPATIAL_APTITUDE_CATEGORY
} from './aptitude';

export * from './types';
export * from './digital-foundations';
export * from './programming-fundamentals';
export * from './web-development';
export * from './c-programming';
export * from './data-structures';
export * from './algorithms';
export * from './discrete-math';
export * from './engineering-math';
export * from './digital-logic';
export * from './coa';
export * from './theory-of-computation';
export * from './compiler-design';
export * from './operating-systems';
export * from './dbms';
export * from './computer-networks';
export * from './software-engineering';
export * from './aptitude';

export const CURRICULUM_DATA: Record<string, CurriculumSection> = {
  "aptitude": {
    "name": "Quantitative & Logical Aptitude",
    "slug": "aptitude",
    "description": "Master quantitative aptitude, logical reasoning, verbal ability, and spatial aptitude for campus placements, GATE, and technical screening tests.",
    "categories": [
      QUANTITATIVE_APTITUDE_CATEGORY,
      LOGICAL_REASONING_CATEGORY,
      VERBAL_ABILITY_CATEGORY,
      SPATIAL_APTITUDE_CATEGORY
    ]
  },
  "core-cs": {
    "name": "Core CS",
    "slug": "core-cs",
    "description": "Comprehensive engineering curriculum from zero-knowledge Digital Foundations and Web Development to Algorithms, OS, DBMS, Networks, and Software Architecture.",
    "categories": [
      DIGITAL_FOUNDATIONS_CATEGORY,
      PROGRAMMING_FUNDAMENTALS_CATEGORY,
      WEB_DEVELOPMENT_CATEGORY,
      C_PROGRAMMING_CATEGORY,
      DATA_STRUCTURES_CATEGORY,
      ALGORITHMS_CATEGORY,
      DISCRETE_MATH_CATEGORY,
      ENGINEERING_MATH_CATEGORY,
      DIGITAL_LOGIC_CATEGORY,
      COA_CATEGORY,
      TOC_CATEGORY,
      COMPILER_DESIGN_CATEGORY,
      OPERATING_SYSTEMS_CATEGORY,
      DBMS_CATEGORY,
      COMPUTER_NETWORKS_CATEGORY,
      OOPS_CATEGORY,
      SYSTEM_DESIGN_CATEGORY,
      SWE_GIT_CATEGORY
    ]
  }
};
