// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(res) {
  try {
    const response = await (await fetch("https://dummyjson.com/users")).json();
    res.status(200).json({ ...response });
  } catch (error) {}
  // res.status(200).json({ name: "John Doe" });
}
