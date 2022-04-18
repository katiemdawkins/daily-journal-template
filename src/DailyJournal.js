import React, { useState, useEffect } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { addEntry, deleteEntry, getEntries, getEntryById, updateEntry } from "./components/EntryManager";
import { getEntryTags } from "./components/entrytag/EntryTagManager";
import { getMoods } from "./components/mood/MoodManager";
import { getTags } from "./components/tag/TagManager";

export const DailyJournal = () => {
  const [entries, setEntries] = useState([])
  const [moods, setMoods] = useState([])
  const [entry, setEntry] = useState({})
  const [tags, setTags] = useState([])
  const [entryTags, setEntryTags] = useState([])

  useEffect(() => {
    getAllEntries()
    getAllMoods()
    getAllEntryTags()
    getAllTags()
  }, [])

  const getAllEntries = () => {
    getEntries().then(entriesData => setEntries(entriesData))
  }
  
  const getAllEntryTags = () => {
    getEntryTags().then(eTdata => setEntryTags(eTdata))
  }

  const getAllTags = () => {
    getTags().then(tagsData => setTags(tagsData))
  }

  const getAllMoods = ()=>{
    getMoods().then(moodsData => setMoods(moodsData))
  }

  const onEditButtonClick = (entryId) => {
    getEntryById(entryId).then(entryData => setEntry(entryData)).then(() => console.log(entry))
  }

  const onDeleteButtonClick = (entryId) => {
    deleteEntry(entryId)
      .then(getAllEntries)
  }

  const onFormSubmit = (entryData) => {
    console.log("submit", entryData)
    if (entryData.id) {
      updateEntry(entryData).then(getAllEntries)
    } else {
      addEntry(entryData).then(getAllEntries)
    }
    setEntry({
      concept: "",
      entry: "",
      moodId: 0,
      tagId: 0
    })
  }

  //function to connect entry tags with tag name?
  // const entryTagList = () => {
//if tags.id === entryTags.tagId
  // }

  return (
    <div className="DailyJournal container">
      <div className="columns">
        <div className="column">
          <EntryForm entry={entry} moods={moods} tags={tags} onFormSubmit={onFormSubmit} />
        </div>
        <div className="column">
          <EntryList
            entries={entries}
            moods={moods}
            tags={tags}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      </div>

    </div>
  );
};
