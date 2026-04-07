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

export type BlogHomeDocument = PrismicDocument<
  {
    headline: RichTextField;
    description: RichTextField;
    image: ImageField;
  },
  "bloghome"
>;

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

export type CodeSlice = Slice<
  "code",
  { code_block: RichTextField },
  Record<string, never>
>;

export type PostBodySlice = TextSlice | QuoteSlice | CodeSlice;

export type PostDocument = PrismicDocument<
  {
    title: RichTextField;
    date: DateField;
    tags: GroupField<{ tag: KeyTextField }>;
    body: SliceZone<PostBodySlice>;
  },
  "post"
>;

export type ClientsListDocument = PrismicDocument<
  {
    clientslist: GroupField<{
      client_name: KeyTextField;
      client_link: LinkField;
    }>;
  },
  "clientslist"
>;

export type WorkHomeDocument = PrismicDocument<
  {
    work_history: GroupField<{
      company: KeyTextField;
      role: KeyTextField;
      start_date: KeyTextField;
      end_date: KeyTextField;
      company_url: LinkField;
      logo: ImageField;
    }>;
  },
  "workhome"
>;
