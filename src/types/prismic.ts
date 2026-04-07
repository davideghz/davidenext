import type {
  PrismicDocument,
  RichTextField,
  ImageField,
  DateField,
  GroupField,
  LinkField,
  KeyTextField,
  Slice,
  SliceZone,
} from "@prismicio/client";

// bloghome
export type BlogHomeDocument = PrismicDocument<
  {
    headline: RichTextField;
    description: RichTextField;
    image: ImageField;
  },
  "bloghome"
>;

// post
export type TextSlice = Slice<
  "text",
  { text: RichTextField },
  Record<string, never>
>;

export type QuoteSlice = Slice<
  "quote",
  { description: RichTextField },
  Record<string, never>
>;

export type PostBodySlice = TextSlice | QuoteSlice;

export type PostDocument = PrismicDocument<
  {
    title: RichTextField;
    date: DateField;
    tags: GroupField<{ tag: KeyTextField }>;
    body: SliceZone<PostBodySlice>;
  },
  "post"
>;

// clientslist
export type ClientsListDocument = PrismicDocument<
  {
    clientslist: GroupField<{
      client_name: KeyTextField;
      client_link: LinkField;
    }>;
  },
  "clientslist"
>;
