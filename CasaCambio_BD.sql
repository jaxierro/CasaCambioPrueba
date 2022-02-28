USE [master]
GO
/****** Object:  Database [CasaCambio]    Script Date: 28/2/2022 3:05:28 p. m. ******/
CREATE DATABASE [CasaCambio]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CasaCambio', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\CasaCambio.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CasaCambio_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\CasaCambio_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [CasaCambio] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CasaCambio].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CasaCambio] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CasaCambio] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CasaCambio] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CasaCambio] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CasaCambio] SET ARITHABORT OFF 
GO
ALTER DATABASE [CasaCambio] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CasaCambio] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CasaCambio] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CasaCambio] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CasaCambio] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CasaCambio] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CasaCambio] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CasaCambio] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CasaCambio] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CasaCambio] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CasaCambio] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CasaCambio] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CasaCambio] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CasaCambio] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CasaCambio] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CasaCambio] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CasaCambio] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CasaCambio] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CasaCambio] SET  MULTI_USER 
GO
ALTER DATABASE [CasaCambio] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CasaCambio] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CasaCambio] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CasaCambio] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CasaCambio] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CasaCambio] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [CasaCambio] SET QUERY_STORE = OFF
GO
USE [CasaCambio]
GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 28/2/2022 3:05:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clientes](
	[IdCliente] [int] IDENTITY(1,1) NOT NULL,
	[DocumentoID] [varchar](50) NOT NULL,
	[Nombres] [varchar](50) NOT NULL,
	[Apellidos] [nchar](10) NOT NULL,
	[FechaReg] [datetime] NOT NULL,
	[FechaAct] [datetime] NOT NULL,
	[Estatus] [int] NOT NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[IdCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Emails]    Script Date: 28/2/2022 3:05:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Emails](
	[IdEmail] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[IdCliente] [int] NOT NULL,
	[FechaReg] [datetime] NOT NULL,
	[FechaAct] [datetime] NOT NULL,
	[Estatus] [int] NOT NULL,
 CONSTRAINT [PK_Emails] PRIMARY KEY CLUSTERED 
(
	[IdEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Clientes] ON 
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (1, N'16278341', N'Javier', N'Rodriguez ', CAST(N'2022-10-26T00:00:00.000' AS DateTime), CAST(N'2022-02-28T14:55:24.320' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (14, N'16278350', N'Jose', N'Jil       ', CAST(N'2022-02-27T12:47:27.413' AS DateTime), CAST(N'2022-02-27T16:38:52.080' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (16, N'16278382', N'Jesus', N'Castillo  ', CAST(N'2022-02-27T12:55:00.890' AS DateTime), CAST(N'2022-02-27T12:55:00.890' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (17, N'16278432', N'Nataly', N'Garcia    ', CAST(N'2022-02-27T13:13:38.580' AS DateTime), CAST(N'2022-02-27T13:13:38.580' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (18, N'16278361', N'Kilo', N'Jimenez   ', CAST(N'2022-02-27T13:22:47.237' AS DateTime), CAST(N'2022-02-27T13:22:47.237' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (19, N'16278542', N'Carlos', N'Sosa      ', CAST(N'2022-02-27T13:38:20.420' AS DateTime), CAST(N'2022-02-27T13:38:20.420' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (20, N'16278343', N'Cristian alvarado 25', N'Pineda    ', CAST(N'2022-02-27T13:52:34.557' AS DateTime), CAST(N'2022-02-27T17:05:14.633' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (21, N'16278362', N'Toñito', N'Perez     ', CAST(N'2022-02-27T14:29:08.287' AS DateTime), CAST(N'2022-02-27T14:29:08.293' AS DateTime), 1)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (22, N'162783543', N'Tomas', N'Rincon    ', CAST(N'2022-02-27T14:29:55.723' AS DateTime), CAST(N'2022-02-27T14:29:55.723' AS DateTime), 0)
GO
INSERT [dbo].[Clientes] ([IdCliente], [DocumentoID], [Nombres], [Apellidos], [FechaReg], [FechaAct], [Estatus]) VALUES (27, N'16278369', N'Juan', N'Soto      ', CAST(N'2022-02-28T12:04:41.927' AS DateTime), CAST(N'2022-02-28T12:04:41.927' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Clientes] OFF
GO
SET IDENTITY_INSERT [dbo].[Emails] ON 
GO
INSERT [dbo].[Emails] ([IdEmail], [Email], [IdCliente], [FechaReg], [FechaAct], [Estatus]) VALUES (1, N'correo1@gmail.com', 1, CAST(N'2022-02-27T18:25:10.427' AS DateTime), CAST(N'2022-02-27T18:25:10.427' AS DateTime), 1)
GO
INSERT [dbo].[Emails] ([IdEmail], [Email], [IdCliente], [FechaReg], [FechaAct], [Estatus]) VALUES (2, N'jaxier.rod@gmail.com', 1, CAST(N'2022-02-28T10:49:13.573' AS DateTime), CAST(N'2022-02-28T10:49:13.577' AS DateTime), 1)
GO
INSERT [dbo].[Emails] ([IdEmail], [Email], [IdCliente], [FechaReg], [FechaAct], [Estatus]) VALUES (3, N'jaxier.rod1@gmail.com', 1, CAST(N'2022-02-28T10:52:55.973' AS DateTime), CAST(N'2022-02-28T10:52:55.973' AS DateTime), 1)
GO
INSERT [dbo].[Emails] ([IdEmail], [Email], [IdCliente], [FechaReg], [FechaAct], [Estatus]) VALUES (4, N'todo@gmail.com', 1, CAST(N'2022-02-28T11:03:11.000' AS DateTime), CAST(N'2022-02-28T11:03:11.000' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Emails] OFF
GO
USE [master]
GO
ALTER DATABASE [CasaCambio] SET  READ_WRITE 
GO
