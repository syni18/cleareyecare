import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import AuthDropdown from "../dropdown/Dropdown";
import { fetchSearchProducts, getUsername } from "../../helper/helper.js";
import { Cog, Search, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
