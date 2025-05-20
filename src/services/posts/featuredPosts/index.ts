
import { BlogPost } from "@/types/blog";
import { modeladorBIM } from "./modeladorBIM";
import { supervisorSSOMA } from "./supervisorSSOMA";
import { bimValorizacion } from "./bimValorizacion";
import { mineriaSostenible } from "./mineriaSostenible";
import { seguridadMinas } from "./seguridadMinas";

export const featuredPosts: BlogPost[] = [
  modeladorBIM,
  supervisorSSOMA,
  bimValorizacion,
  mineriaSostenible,
  seguridadMinas
];
