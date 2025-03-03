import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

const DataTableWithAPI = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const posts = response.data.map((post) => ({
          postid: post.id,
          postname: post.title,
          postbody: post.body,
        }));
        setData(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        paging: true,
        searching: true,
        info: true,
        lengthChange: true,
        lengthMenu: [5, 15, 20, 50, 100],
        pageLength: 5,
        data: data,
        columns: [
          { title: "ID", data: "postid" },
          { title: "Post Name", data: "postname" },
          { title: "Post Content", data: "postbody" },
        ],
      });

      return () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          table.destroy();
        }
      };
    }
  }, [data]);

  return (
    <div className="container">
      <div className="table-wrapper">
        <h2 className="table-title">Data Table</h2>
        <table ref={tableRef} className="display data-table"></table>
      </div>
    </div>
  );
};

export default DataTableWithAPI;
