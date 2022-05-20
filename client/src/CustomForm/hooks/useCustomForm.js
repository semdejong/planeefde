import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { useUserContext } from "../../Context/UserContext";
import { uploadForm, getForm } from "../../API/customPageApi";
import { createLead, getLeadProgress } from "../../API/leadApi";

export default function useCustomForm(id) {
  const [leadInfo, setLeadInfo] = useState();

  useEffect(() => {
    async function setupLead() {
      await getLead();
    }
    setupLead();
  }, []);

  const { role } = useUserContext();

  const { data, isLoading, error } = useQuery(["customForm", id], () =>
    getForm(id)
  );

  const customFormObj = {
    pages: 1,
    customFields: [],
  };

  const [customForm, setCustomForm] = useState(customFormObj);
  const [isUploadingStyle, setIsUploadingStyle] = useState(false);

  useEffect(() => {
    async function writeStyleToServer() {
      if (role === "admin" && !isLoading && customForm !== customFormObj) {
        setIsUploadingStyle(true);
        const response = await uploadForm(id, { customForm: customForm });
        setIsUploadingStyle(false);
      }
    }

    writeStyleToServer();
  }, [customForm]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        setCustomForm(data.data);
      }
    }
  }, [data]);

  const getLead = async () => {
    if (id === "undefined") {
      return;
    }

    localStorage.setItem("localStorageProject", id);
    const lead = localStorage.getItem("leadId" + id);
    if (!lead) {
      const response = await createLead(id);
      localStorage.setItem("leadId" + id, response.data._id);
      setLeadInfo({ _id: response.data._id, progress: 0 });
    } else {
      const leadProgress = await getLeadProgress(lead);
      if (leadProgress.status === 200) {
        setLeadInfo({
          _id: lead,
          progress: leadProgress.data.lastCompletedPage,
        });
      }
    }
  };

  return {
    customForm,
    setCustomForm,
    isLoading,
    leadInfo,
  };
}
