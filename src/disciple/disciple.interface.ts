export enum MainAttribute {
  JY, // ji yun
  BJ, // bao ji
  FJ, // fan ji
  SB, // shan bi
  XX, // xi xue
  LJ, // lian ji
  KY, // kang yun
  KBJ, // kang bao ji
  KFJ, // kang fan ji
  KSB, // kang shan bi
  KXX, // kang xi xue
  KLJ, // kang lian ji
}

export enum SubAttribute {
  JS, // jian shang
  ZS, // zeng shang
  RL, // ruo ling
  QL, // qiang ling
  RLA, // ruo liao
  QLA, // qiang liao
  BS, // bao shang
  GJ, // gong ji
}

export interface Deciple {
  id?: number;
  ownerId: number;
  mian_attribute_id?: MainAttribute;
  mian_attribute_val?: number;
  sub_attributes?: SubAttribute[];
  sub_attributes_val?: number[];
}

export interface DecipleWantFor extends Deciple {
  want_for_main?: MainAttribute;
  want_for_main_val?: number;
  want_for_sub?: SubAttribute[];
}

export type DiscipleQueryParams = {
  mian_attribute_id?: MainAttribute;
  mian_attribute_val?: number;
  // sub_attributes?: SubAttribute[];
  ownerId?: number;
};
