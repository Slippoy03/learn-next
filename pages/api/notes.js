export default async function handler(req, res) {
  const { method } = req;
  const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}notes`;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const response = await fetch(apiBaseUrl);
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Error fetching notes" });
      }
      break;

    case "POST":
      try {
        const newNote = await fetch(apiBaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });
        const result = await newNote.json();
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Error creating new note" });
      }
      break;

    case "DELETE":
      if (!id) {
        return res.status(400).json({ error: "Note ID is required" });
      }
      try {
        const deleteNote = await fetch(`${apiBaseUrl}/${id}`, {
          method: "DELETE",
        });
        const deleteResult = await deleteNote.json();
        if (deleteNote.ok) {
          res
            .status(200)
            .json({ success: true, message: "Note deleted successfully" });
        } else {
          res.status(deleteNote.status).json({ error: deleteResult.message });
        }
      } catch (error) {
        res.status(500).json({ error: "Error deleting note" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
